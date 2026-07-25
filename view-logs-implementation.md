### View Logs Implementation
1) Each log has the same template of code:
    ```perl
        my ($act_name, $cls_name, $class_id) = $dbh->selectrow_array(q[
           SELECT s.survey_name, c.course, s.class_id
           FROM survey s
           JOIN class c ON s.class_id = c.class_id
           WHERE s.survey_id = ?
        ], undef, $survey_id);
        my $json_data = encode_json({
           class       => $cls_name || "Course",
           activity    => $act_name || "Activity",
           class_id    => $class_id,
           survey_id   => $survey_id
        });
        $dbh->do(q[
            INSERT INTO event_log (person_id, event_type, event_data, inserted_on, role_id)
            VALUES (?, ?, ?::json, NOW(), ?)
        ], undef, $userid, 'deleted_activity', $json_data, 2);
    ```
    The log is stored in `event_log` table and visible at the `view_logs` page in the UI. 

2) Update the list of logs that are tracked in the `view_logs` file. At the top of `view_logs` UI for each of faculty, student and admin, the list of logs includes all the logs that are currently being tracked, so that will need to be updated if a new log is added. Eg: the list is for student - <br>
`<b>Student logs include:</b> login, activity_started, activity_finished, profile_changed.`

## Notes:
1) Add the following import to store json metadata for the log: <br>
`use JSON qw(encode_json);`

2) If any new details are added as json metadata apart from the below mentioned, ensure to update the `@display_keys` in `view_logs` file:
    <br>**faculty display_keys**: course, class, activity, student_name, deadline
    <br>**student display_keys**: course, class, activity, student_name, deadline
    <br>**admin display_keys**: course, class, activity, student_name, person_name, person_type, email, institution, stud_id, role

3) Add the log code to the relevant action, for example in this if condition:<br>
    `elsif ($action eq 'Delete Activity') {` <br>
    To be able to track log for clicking 'Delete Activity'.

## Explanation:

a) Fetching required details
```perl
    my ($act_name, $cls_name, $class_id) = $dbh->selectrow_array(q[
        SELECT s.survey_name, c.course, s.class_id
        FROM survey s
        JOIN class c ON s.class_id = c.class_id
        WHERE s.survey_id = ?
    ], undef, $survey_id);
```

This is used to fetch the additional required details needed for the log which were not already fetched in the code. In this case, we are fetching activity name (`$act_name`), class name (`$cls_name`), and class id (`$class_id`).

b) Collating metadata in `$json_data`:
```perl
    my $json_data = encode_json({
        class       => $cls_name || "Course",
        activity    => $act_name || "Activity",
        class_id    => $class_id,
        survey_id   => $survey_id
    });
```
NOTE: ensure to add this at the top of the file to store the metadata as json fields:<br>
`use JSON qw(encode_json);`

Here, we store all the relevant details to the log in `$json_data`. Since the log here is deleted_activity, we are storing the class name, activity name, class id, and survey id. survey_id is already fetched and used in code earlier in the file, so we do not need to fetch it again in the previous step and can store it directly here.

To save IP address to add to the metadata, use this line:<br>
`my $ip = eval { $r->connection->remote_ip } || $ENV{'REMOTE_ADDR'} || '0.0.0.0';`

c) Logging it into event_log table:
```perl
$dbh->do(q[
        INSERT INTO event_log (person_id, event_type, event_data, inserted_on, role_id)
        VALUES (?, ?, ?::json, NOW(), ?)
    ], undef, $userid, 'deleted_activity', $json_data, 2);
```

Here we add the log to the table. All logs are stored by the role of the person causing the event. We log by:
- `person_id` (unique id for each person from person table)
- `event_type` (all event_types are mentioned at the top of the view_logs UI for each role)
- `event_data` (the json_data metadata)
- `inserted_on` (date and time for when the log was created and added)
- `role_id` (the role of the person causing the log): 1 for admin, 2 for faculty, 3 for student