import csv 
import os
import json
import ast

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with open("coursedesc.json", 'r') as fp:
        # print(type(fp.read()))
        coursedesc= json.loads(fp.read())

offerCourse=set()
for course in coursedesc:
    #print(course.encode('ascii','ignore'))
    offerCourse.add(course.encode('ascii','ignore'))

with open("courseIndexSearchList.json", 'r') as fp:
        # print(type(fp.read()))
        courseList= json.loads(fp.read())

skuleCourse=set()
for course in courseList:
    splitCourse=course['name'].split(' -')
    course=splitCourse[0]
    #print(course)
    skuleCourse.add(course.encode('ascii','ignore'))

#print the course in skule but not in the courseList (may be obsolete)
obsolete_course=skuleCourse.difference(offerCourse)
print ("print the course in skule but not currently offered:",obsolete_course)
#print the course in courseList but not in skule
new_course=offerCourse.difference(skuleCourse)
print ("print the course offered but not in skule :",new_course)
