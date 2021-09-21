

import csv 
import os
import json

run = True

programNames = ["Track One", "MIN", "MIE", "MSE", "ESC", "ECE", "CIV", "CHE"]

def main():
    engineeringCourseList = {}

    for program in programNames:
        fileName = "./"+program+".csv"
        programCourseList = []

        with open(fileName, 'r') as csvfile: 
            csvReader = csv.reader(csvfile) 
            rowNum=-1
            for row in csvReader: 
                if rowNum==-1:
                    rowNum+=1
                    continue #skip first row and start at second row of csv
                courseCode = row[0].split(" - ")[0][0:6]
                courseName = row[0].split(" - ")[1]
                programCourseList.append({"id":rowNum, "courseCode": courseCode, "courseName": courseName})
                rowNum +=1
        engineeringCourseList[program]=programCourseList
    with open('./engineeringCourseNames.json', 'w') as fp:
        json.dump(engineeringCourseList, fp)
    print(engineeringCourseList)

if run:
    main()