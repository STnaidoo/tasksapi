const cron = require("node-cron");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "pass",
  database: "touraxis",
  port: 3567,
});

// more work required here (doesn't work yet)
// TODO: dockerfile to include cron installation
// make this file a bash script perhaps that is set up to run in the docker container?

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

cron.schedule("* * * * *", () => {
  const currentDate = new Date();

  const query = `
    SELECT * FROM Tasks
    WHERE status = 'pending'
    AND next_execute_date_time <= ?
  `;

  connection.query(query, [currentDate], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return;
    }

    if (results.length === 0) {
      console.log("No tasks found matching the criteria. Exiting.");
      process.exit();
    }

    for (const task of results) {
      console.log(`Executing task: ${task.name}`);

      // Update status to "done"
      connection.query(
        "UPDATE Tasks SET status = ? WHERE id = ?",
        ["done", task.id],
        (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating task:", updateError);
          } else {
            console.log(`Task ${task.id} updated successfully`);
          }

          // If this is the last task, exit the script
          if (task === results[results.length - 1]) {
            console.log("All tasks processed. Exiting.");
            process.exit();
          }
        }
      );
    }
  });
});
