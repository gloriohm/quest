package core

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"os"
)

type Task struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}

var tasks []Task

const dataFile = "tasks.json"

func SaveTasks() error {
	file, err := os.Create(dataFile)
	if err != nil {
		return err
	}
	defer file.Close()
	encoder := json.NewEncoder(file)
	return encoder.Encode(tasks)
}

// Load tasks from a file
func LoadTasks() error {
	file, err := os.Open(dataFile)
	if err != nil {
		if errors.Is(err, fs.ErrExist) {
			return nil // No file yet, no tasks to load
		}
		return err
	}
	defer file.Close()
	decoder := json.NewDecoder(file)
	return decoder.Decode(&tasks)
}

// Add a new task
func AddTask(title string) {
	var lastIndex int
	var lastID int

	// find index of last item in tasks, default to 0 if none
	if len(tasks) == 0 {
		lastID = 0
	} else {
		lastIndex = len(tasks) - 1
		lastID = tasks[lastIndex].ID
	}
	tasks = append(tasks, Task{
		ID:    lastID + 1,
		Title: title,
		Done:  false,
	})
	fmt.Println("Task added:", title)
}

// Mark a task as done
func MarkTaskDone(id int) {
	for i, task := range tasks {
		if task.ID == id {
			tasks[i].Done = true
			fmt.Println("Task marked as completed")
			return
		}
	}
	fmt.Println("Task not found with ID:", id)
}

func RemoveTask(id int) {
	// Use a new slice to hold the filtered tasks
	result := tasks[:0] // Zero-length slice with the same capacity as tasks

	for _, task := range tasks {
		if task.ID != id {
			result = append(result, task) // Add only tasks that don't match the ID
		}
	}

	tasks = result
}
