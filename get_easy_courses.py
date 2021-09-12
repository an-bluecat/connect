import requests
from bs4 import BeautifulSoup
import json

# courses contains course codes of easy courses, this is not the full list of courses
courses = ['PHL101', 'NMC104', 'PCL102', 'EEB214', 'AST201', 'JWE206', 'CLA201']

for course in courses:
    # The url for each course on the arts and science calender differs by the course code
    # all other parts are the same
    url = 'https://artsci.calendar.utoronto.ca/search-courses?course_keyword=' + course + \
          '&field_section_value=All&field_prerequisite_value=&field_breadth_requirements_' \
          'value=All&field_distribution_requirements_value=All'

    # get request
    r = requests.get(url)

    # returns html code for the page
    text = BeautifulSoup(r.text, 'html.parser')

    # finds the div that contains the title and all info of the course
    div = text.find(class_='views-row')

    # gets the title (name of course + course code)
    course_title = div.find(class_='js-views-accordion-group-header').get_text()

    # gets the description of the course (including breadth category, exclusions, etc.)
    desc = div.find(class_='views-row')

    # gets the written description
    par = desc.find(class_='views-field-body').get_text()

    # gets the breadth requirement
    breadth = div.find(class_='views-field-field-breadth-requirements').get_text()

    # takes the breadth category, written description, and course title and puts them in one dict
    course_info = {
        'breadth': breadth,
        'desc': par,
        'title': course_title
    }

    # converts the python to json
    json_code = json.dumps(course_info)

    print(json_code)
