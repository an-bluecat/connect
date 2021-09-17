

import csv 
import os
import json


run = True

def createClassCourseList(programName):
    programCourseList = {"yearOne":[],"yearTwo":[],"yearThree":[],"yearFour":[]}
    with open(programName+'.csv') as csvfile:
        reader = csv.DictReader(csvfile,delimiter=',')
        programCourseList = {"yearOne":[], "yearTwo":[], "yearThree":[], "yearFour":[]}
        for row in reader:
            print(row)
            for yearNumber in row:
                rawCourseData= row[yearNumber]
                courseCode = rawCourseData.split(" -")[0][0:6]
                courseName = rawCourseData.split(" -")[-1]
                if courseCode != "" and yearNumber in programCourseList:   
                    courseItem = {"courseCode":courseCode, "courseName":courseName}
                    programCourseList[yearNumber].append(courseItem)
    return programCourseList


programNames=["Chem","Civ","ECE","EngSci","Indy","MSE","Mech","Min","T1"]


def main():
    allEngineeringCourses={}
    for program in programNames:
        allEngineeringCourses[program] = createClassCourseList(program)
    with open('./engineeringCourseList.json', 'w') as fp:
        json.dump(allEngineeringCourses, fp)


if run:
    main()
