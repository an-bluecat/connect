from firebase import firebase


'''import csv 
import os
import json

# print("working dir", os.getcwd())
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


    
    id = 0
    for row in rows: 
        if len(row) == 0:
            continue
        for i in range(0,len(row),1):
            courseStr=row[i]
            if courseStr!="":
                courseStr=courseStr.replace(" ","")
                courseStr=courseStr.split("-",maxsplit=2)
                code=courseStr[0]
                name=courseStr[1]
                # if(len(courseStr[0])==0):
                #     code=courseStr[1]
                #     name=courseStr[0]
                # elif(len(courseStr[1])==0):
                #     code=courseStr[0]
                #     name=courseStr[1]
                # elif (len(courseStr[0])<len(courseStr[1])):
                #     code=courseStr[0]
                #     name=courseStr[1]
                # else:
                #     code=courseStr[1]
                #     name=courseStr[0]
                courseJson[i].append([code,name])
            
    result={classname: courseJson}
    return courseJson

classnames=["Chem","Civ","ECE","EngSci","Indy","MSE","Mech","Min","T1"]
output={}
for name in classnames:
    temp=parseClass(name)
    output[name]=temp

with open('./src/components/course/coursecsv/courseimport.json', 'w') as fp:
    json.dump(output, fp)
'''