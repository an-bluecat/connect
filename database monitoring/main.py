
import csv 
import os
import json

import ast
import datetime
from datetime import date
from datetime import datetime 
from datetime import timedelta


# printFiles=True
printFiles=False

printComment=True
# printComment=False

# printRating=True
printRating=True

def GetUserActivities(startDay,endDay, filepath):
    startDay=datetime.strptime(start,"%Y-%m-%d")
    endDay=datetime.strptime(end,"%Y-%m-%d")+timedelta(days=1) 
  
    with open(filepath, 'r') as fp:
        # print(type(fp.read()))
        jsonData= json.loads(fp.read())
        jsonData=jsonData["courses"]

    commentCount=0
    ratingCount=0
    for className in jsonData:
        classes=jsonData[className]
        for elements in classes:
            #extract comment
            if elements=="comment" and printComment:
                commentCount+=1
                comment=classes[elements]
                #extract user
                for user in comment:
                    entry=comment[user]
                    #extract time
                    if 'time_log' in entry:
                        postTime=datetime.strptime(entry['time_log'],'%Y-%m-%dT%H:%M:%S.%fZ') 
                    else:
                        postTime=datetime.strptime(entry['time'],"%Y-%m-%d") 
                    if (postTime>=startDay) and (postTime<=endDay) and printComment==True:
                        if("user" in entry and entry['user']!="unknown" and "email" in entry['user']):
                            name=entry['user']['email']
                        else:
                            name="unknown"
                        if name!="uofthub@gmail.com":
                            print(className,"Comment: User:",name," rate:",entry['rate'],entry['usefulness'], " comment:",entry['comment'].encode('ascii','ignore')," at ",postTime)
                    

            #extract file upload
            if elements=="files" and printFiles==True:
                files=classes[elements]
                #extract user
                for user in files:
                    entry=files[user]
                    #extract time
                    print("file:",entry['date'])
                    break
                    postTime=datetime.strptime(entry['date'],'%Y-%m-%dT%H:%M:%S.%fZ')
                    
                    if (postTime>=startDay) and (postTime<=endDay) and printFiles==True:
                        print(className.encode('ascii','ignore'),"Files: post",entry['filename'].encode('ascii','ignore'),"at",postTime)

                    # if "imageUrl" not in entry:
                    #     print("classname", className, "doesn't have imageURL")
            #extract rating 
            if elements=="rating" and printRating==True:
                ratingCount+=1
                rating=classes[elements]
                #extract user
                for key in rating:
                    entry=rating[key]
                    #extract time
                    if 'time_log' in entry:
                        postTime=datetime.strptime(entry['time_log'],'%Y-%m-%dT%H:%M:%S.%fZ')                  
                        if (postTime>=startDay) and (postTime<=endDay) and printRating==True:      
                            print(className.encode('ascii','ignore')," rate:",entry['rate'],entry['usefulness'], "at",postTime)
    print("commentCount:",commentCount)
    print("ratingCount:",ratingCount)

#Main Func: ENTER the start and end day u wants
start="2021-10-05" 
end="2021-12-11"              
GetUserActivities(start,end,filepath="./211211/uofthub-export.json")

    


