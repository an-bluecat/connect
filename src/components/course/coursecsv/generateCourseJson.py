

import csv 
import os
import json


run = True




# print("working dir", os.getcwd())
################################ getting courseIndexSearchList
########################### COURRENTLY NOT WORKING!
def parseClass(classname):
    # csv file name 
    filename = "./src/components/course/coursecsv/"+classname+".csv"

    courseJson = [[] for i in range(4)]
    # initializing the titles and rows list 
    # fields = [] 
    rows = [] 
    
    # reading csv file 
    with open(filename, 'r') as csvfile: 
        # creating a csv reader object 
        csvreader = csv.reader(csvfile) 

        # extracting field names through first row 
        # fields = next(csvreader) 

        # extracting each data row one by one 
        for row in csvreader: 
            rows.append(row) 
    
        # get total number of rows 
        print("Total no. of rows: %d"%(csvreader.line_num)) 


    
    # getting course import.json
    for row in rows: 
        if len(row) == 0:
            continue
        for i in range(0,len(row),1):
            courseStr=row[i]
            if courseStr!="":
                # if "ECE411" in courseStr:
                #     print("here",courseStr)
                #     print(courseStr.split("-",maxsplit=1))
                courseStr=courseStr.split("-",maxsplit=1)
                code=courseStr[0]
                name=courseStr[1]
                # get ride of space
                if " " in code:
                    code = code.replace(" ", "")
                else:
                    print("WARNING: ", code, "Does not have a space between it and '-'. Consider adding it! Otherwise there will be potential bug.")
                if name!="" and name[0]==" ":
                    name=name[1:]
                
                if "H1F" in code:
                    code = code.replace("H1F", "")
                if "H1S" in code:
                    code = code.replace("H1S", "")
                if "Y1Y" in code:
                    code = code.replace("Y1Y", "")
                if "H1Y" in code:
                    code = code.replace("H1Y", "")
                if "H1" in code:
                    code = code.replace("H1", "")
                if "Y1" in code:
                    code = code.replace("Y1", "")

                courseJson[i].append([code,name])
            
    result={classname: courseJson}
    # print(courseJson)
    return courseJson

classnames=["Chem","Civ","ECE","EngSci","Indy","MSE","Mech","Min","T1"]
output={}
courseSearchIndex={}
for name in classnames:
    temp=parseClass(name)
    output[name]=temp


if run:
    with open('./src/components/course/coursecsv/courseimport.json', 'w') as fp:
        json.dump(output, fp)



################################ getting courseIndexSearch.json

courseIndexSearch=[]
def getCourseIndex(classname):
    id = 0
    filename = "./src/components/course/coursecsv/"+classname+".csv"
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
            for i in range(0,len(row),1):
                courseStr=row[i]
                if courseStr!="":
                    # courseStr=courseStr.split("-",maxsplit=2)
                    # code=courseStr[0]
                    # name=courseStr[1]
                    # # get ride of space
                    # if code[-1]==" ":
                    #     code=code[:-1]
                    # if name!="" and name[0]==" ":
                    #     name=name[1:]
                    
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
for name in classnames:
    getCourseIndex(name)




if run:
    with open('./src/components/course/courseIndexSearchList.json', 'w') as fp:
        json.dump(courseIndexSearch, fp)