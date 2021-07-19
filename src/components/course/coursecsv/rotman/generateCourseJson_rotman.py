import csv 
import os
import json

coursedesc={}

# load previous courses, add rotman's onto them!
with open('./src/components/course/coursedesc.json', 'r') as fp:
    coursedesc=json.load(fp)

# print(coursedesc)

run = True


################################ getting courseIndexSearch.json

courseIndexSearch=[]


def getCourseIndex(discipline):
    id = 0
    filename = "./src/components/course/coursecsv/rotman/"+discipline+".csv"
    rows = [] 
    with open(filename, 'r') as csvfile: 
            # creating a csv reader object 
            csvreader = csv.reader(csvfile) 
            # extracting each data row one by one 
            for row in csvreader: 
                rows.append(row) 
    for row in rows: 
            if len(row) == 0:
                continue
            
            courseStr=row[0]
            if courseStr!="":
                # courseindexsearch
                if "H1F" in courseStr:
                    courseStr = courseStr.replace("H1F", "")
                if "H1S" in courseStr:
                    courseStr = courseStr.replace("H1S", "")
                if "Y1Y" in courseStr:
                    courseStr = courseStr.replace("Y1Y", "")
                if "H1Y" in courseStr:
                    courseStr = courseStr.replace("H1Y", "")
                if "H1" in courseStr:
                    courseStr = courseStr.replace("H1", "")
                if "Y1" in courseStr:
                    if "PHY1" not in courseStr:
                        courseStr = courseStr.replace("Y1", "")

                temp={}
                temp['id']=id
                temp['name']=courseStr
                id+=1
                courseIndexSearch.append(temp)


                # desc

                courseStr=courseStr.split("-",maxsplit=2)
                code=courseStr[0]
                name=courseStr[1]
                # get ride of space
                if code[-1]==" ":
                    code=code[:-1]
                if name!="" and name[0]==" ":
                    name=name[1:]
                
                # key=code, value=["desc","coursename","prerequisites"]
                coursedesc[code]=[row[1],name,row[2]]
                



disciplines=["Accounting","Finance","Management"]
for name in disciplines:
    getCourseIndex(name)




if run:
    with open('./src/components/course/courseIndexSearchList_rotman.json', 'w') as fp:
        json.dump(courseIndexSearch, fp)
    with open('./src/components/course/coursedesc_rotman.json', 'w') as fp:
        json.dump(coursedesc,fp)

