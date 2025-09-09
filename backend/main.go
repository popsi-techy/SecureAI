// backend/main.go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-git/go-git/v5"
)

type ScanRequest struct {
	Type  string `json:"type" binding:"required"`
	Value string `json:"value" binding:"required"`
}

// Structs to match the Gitleaks JSON report format
type GitleaksFinding struct {
	Description string `json:"Description"`
	Secret      string `json:"Secret"`
	File        string `json:"File"`
	LineNumber  int    `json:"StartLine"`
	RuleID      string `json:"RuleID"`
}

func main() {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	r.Use(cors.New(config))

	v1 := r.Group("/v1")
	{
		v1.POST("/scan", func(c *gin.Context) {
			var jsonRequest ScanRequest
			if err := c.ShouldBindJSON(&jsonRequest); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			if jsonRequest.Type == "url" {
				tempDir, err := os.MkdirTemp("", "plugin-scan-*")
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create temporary directory"})
					return
				}
				defer os.RemoveAll(tempDir)

				fmt.Printf("Cloning repository %s into %s\n", jsonRequest.Value, tempDir)
				_, err = git.PlainClone(tempDir, false, &git.CloneOptions{
					URL:      jsonRequest.Value,
					Progress: os.Stdout,
					Depth:    1,
				})

				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clone repository"})
					return
				}

				// --- NEW: GITLEAKS SCANNING LOGIC ---
				fmt.Println("Cloning complete. Starting Gitleaks scan...")
				reportPath := filepath.Join(tempDir, "gitleaks-report.json")

				// 1. Execute the gitleaks command
				cmd := exec.Command("gitleaks", "detect", "--source", tempDir, "-f", "json", "-r", reportPath)
				output, err := cmd.CombinedOutput() // CombinedOutput captures stderr
				if err != nil {
					// Gitleaks exits with a non-zero status code if it finds secrets, which is not a program error.
					// We check if the report was still created. A real program error will likely not create the report.
					if _, statErr := os.Stat(reportPath); os.IsNotExist(statErr) {
						fmt.Printf("Gitleaks execution failed: %s\n", string(output))
						c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to run security scanner."})
						return
					}
				}

				// 2. Read and parse the JSON report
				var findings []GitleaksFinding
				reportData, err := os.ReadFile(reportPath)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read scan report."})
					return
				}

				// Gitleaks produces an empty file if no secrets are found
				if len(reportData) > 0 {
					if err := json.Unmarshal(reportData, &findings); err != nil {
						c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse scan report."})
						return
					}
				}

				fmt.Printf("Gitleaks scan complete. Found %d potential secrets.\n", len(findings))

				// 3. Return the findings in the API response
				c.JSON(http.StatusOK, gin.H{
					"message":  "Scan completed successfully.",
					"findings": findings,
				})

			} else {
				c.JSON(http.StatusOK, gin.H{"message": "ZIP file handling not implemented yet."})
			}
		})
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "pong"})
	})
	r.Run(":8080")
}
