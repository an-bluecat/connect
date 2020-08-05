import csv 
import os
import json

# print("working dir", os.getcwd())
# csv file name 
filename = "./src/components/course/fall_winter_complete.csv"
  
# initializing the titles and rows list 
fields = [] 
rows = [] 
  
# reading csv file 
with open(filename, 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 

    # extracting field names through first row 
    fields = next(csvreader) 

    # extracting each data row one by one 
    for row in csvreader: 
        rows.append(row) 
  
    # get total number of rows 
    print("Total no. of rows: %d"%(csvreader.line_num)) 

classname = 'xxx'
courseJson = []
id = 0
for row in rows: 
    if len(row) == 0:
        continue
    newName = row[0]
    # if different, then save in json
    if newName != classname:
        classname = newName
        # modify class name
        if "H1F" in newName:
            newName = newName.replace("H1F", "")
        if "H1S" in newName:
            newName = newName.replace("H1S", "")
        if "Y1Y" in newName:
            newName = newName.replace("Y1Y", "")
        if "H1Y" in newName:
            newName = newName.replace("H1Y", "")
        courseJson.append({'id': id, 'name': newName})
        id += 1
        
    
# print(courseJson)
with open('./src/components/course/courseimport.json', 'w') as fp:
    json.dump(courseJson, fp)