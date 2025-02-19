# Quest Documentation

## Task types

### Dailies

#### Frequency
Dailies vary from goals and quests in that they are re-occurring. For this reason, you are able to adjust the frequency with which they show up in your to-do list.

##### Settings
1. Interval Multiplier
    This setting works like a multiplier that uses days as its base value.
    Day = 1
    Week = 7
    Month = 30
2. Interval Amount
    This sets the amount of days/weeks/months in between each occurrence if you use frequency type a,
    or how many times it will occurr within an interval if you use frequency type b.
3. Frequency type
    This setting decides how the next occurrence is calculated.
    a. Minimum x between (Lenient type): Simply adds the amount of time specified in setting 1 and 2 to the date of completion.
    EXAMPLE: Interval = "Week" and Interval amount = 3 -> add 21 days (7 x 3) to the next occurrence from today
    b. Maximum x between (Strict type): Adds the amount of time specified in setting 1 and 2 to the date of completetion _minus_ the difference between last completed and today.
    EXAMPLE: Interval = "Day" and Interval amount = 4 -> Interval = 4 days (1 x 4). Difference between today 2025-02-09 and last completed 2025-02-03 = 6. Difference from 4 = 2. Adds 2 days to date of completion.
    NOTE: This will potentially make the task happen again as soon as tomorrow if you have not been keeping up with it.
4. Days
    This setting let's you specify on what days the task can/will occurr. Unselecting a day will prevent it from showing up in the to-list on that day.
    