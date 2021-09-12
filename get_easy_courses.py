import requests
from bs4 import BeautifulSoup
import pprint

url = 'https://oneclass.com/blog/university-of-toronto-st-george/824-10-of-the-easiest-classes-at-university-of-toronto.en.html'

r = requests.get(url)

text = BeautifulSoup(r.text, 'html.parser')

div = text.find(class_='BlogShowLayout_content__82t2j')

courses = div.find_all('a')

list1 = []

# course = courses[0]
#
# print(course.get_text())

for i in range(len(courses)):
    course_title = courses[i]
    print(course_title.get_text())
    # course_title.replace('\xa0', '')

