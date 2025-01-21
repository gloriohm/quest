package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/gloriohm/quest/internal/core"
)

func main() {
	if err := core.LoadTasks(); err != nil {
		fmt.Println("Error loading tasks")
		return
	}
	defer core.SaveTasks()

	if len(os.Args) < 2 {
		fmt.Println("Usage: todo-cli <command> [arguments]")
		fmt.Println("Commands: add <task>, list, done <id>")
		return
	}

	command := os.Args[1]

	switch command {
	case "add":
		if len(os.Args) < 3 {
			fmt.Println("Usage: quest add <task>")
			return
		}
		core.AddTask(strings.Join(os.Args[2:], ""))
	case "remove":
		if len(os.Args) < 3 {
			fmt.Println("Usage: quest remove <id>")
			return
		}
		id, err := strconv.Atoi(os.Args[2])
		if err != nil {
			fmt.Println("Invalid task ID:", os.Args[2])
			return
		}
		core.RemoveTask(id)
	default:
		fmt.Println("Unknown command:", command)
		fmt.Println("Commands: add <task>, list, done <id>")
	}
}
