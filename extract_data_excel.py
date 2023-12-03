import pandas as pd
from bs4 import BeautifulSoup
import json

readPdf = pd.read_excel("خطة تقنية المعلومات-1445-المتطلبات.xlsx")
readPdf.to_html("hi.html")



# Open the HTML file
with open('hi.html', 'r', encoding='utf-8') as file:
    # Read the content of the file
    html_content = file.read()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')
    print(soup)
    # Initialize a list to store the extracted data
    ignore = ["NaN", "الوحدات", "اسم المقرر", "رمز المقرر", "الساعات", "م"]
    hour = []
    code = []
    subjects = []
    subWant = ["النحو","التوحيد","ندوة","تعلم الة","العقيدة","الفقه", "انجلزي 1","انجلزي 2"]
    # Find all <tr> elements
    for row in soup.find_all('tr'):
        # Extract data from each <td> element within the <tr>
        for columns in row.find_all('td'):
            # Check if the row contains valid data and has at least 6 columns
            if columns.string not in ignore:
                if columns.string.isnumeric():
                    print(columns.string)
                    if(int(columns.string)):
                        hour.append(columns.string)
                elif len(columns.string) == 3:
                    convert = float(columns.string)
                    convertInt = int(convert)
                    hour.append(columns.string)
                elif columns.string in subWant:
                    subjects.append(columns.string)
                elif len(columns.string) <=8 and not columns.string.isnumeric() and len(columns.string) > 3:
                    code.append(columns.string)
                else:
                    subjects.append(columns.string)



data_list = []
level = []
newSub = []
for i in subjects:
    if "المستوى :" in i:
        level.append(i)
    else:
        newSub.append(i)
print(len(hour))
print(len(code))
print(len(newSub))
for i in code:
    print(i)
for i in newSub:
        j = newSub.index(i)
        data_dict = {
            "hour": hour[j].string,
            "code": code[j].string,
            "sub": newSub[j].string,
        }
        data_list.append(data_dict)
# Print the extracted data (for debugging purposes)
# print("Extracted Data:", data_list)

json_level = json.dumps(level,ensure_ascii=False, indent=4)
json_data = json.dumps(data_list, ensure_ascii=False, indent=4)
level_dict = {}
print(json_data)

# # Convert the dictionary to a JSON file
# ss = json.dump(level_dict, json_file, ensure_ascii=False, indent=2)
# print(ss)
# with open('output.json', 'w', encoding='utf-8') as json_file:
# Write JSON data to a file
with open('IT444.json', 'w', encoding='utf-8') as json_file:
    json_file.write(json_data)

#_________________________________________________________________________
