# 找出coursedesc中有但是courseimport.json没有的课

import csv 
import os
import json
import ast
import pandas as pd

with open("coursedesc.json", 'r') as fp:
        # print(type(fp.read()))
        coursedesc= json.loads(fp.read())

offerCourse=set()
for course in coursedesc:
    #print(course.encode('ascii','ignore'))
    offerCourse.add(course)

with open("courseIndexSearchList.json", 'r') as fp:
        # print(type(fp.read()))
        courseList= json.loads(fp.read())

skuleCourse=set()
for course in courseList:
    splitCourse=course['name'].split(' -')
    course=splitCourse[0]
    #print(course)
    skuleCourse.add(course)

#print the course in skule but not in the courseList (may be obsolete)
#obsolete_course=skuleCourse.difference(offerCourse)
#print "print the course in skule but not currently offered:",obsolete_course
#print the course in courseList but not in skule

new_course=list(offerCourse.difference(skuleCourse))
#print ("print the course offered but not in skule :",new_course)
#store the new courses into csv file 

new_course_df=pd.DataFrame(new_course)
print(new_course_df)
new_course_df.to_csv("newCourse.csv",index=False,header=False)
