import pandas as pd
from bs4 import BeautifulSoup
import json
# readPdf = pd.read_excel("test.xlsx")
# readPdf.to_html("hi.html")

# Open the HTML file
with open('hi.html', 'r', encoding='utf-8') as file:
    # Read the content of the file
    html_content = file.read()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Initialize a list to store the extracted data
    ignore = ["NaN", "الوحدات", "اسم المقرر", "رمز المقرر"]
    hour = []
    code = []
    subjects = []
    # Find all <tr> elements
    for row in soup.find_all('tr'):
        # Extract data from each <td> element within the <tr>
        for columns in row.find_all('td'):
            # Check if the row contains valid data and has at least 6 columns
            if columns.string not in ignore:
                if columns.string.isnumeric():
                    if(int(columns.string)):
                        hour.append(columns.string)
                elif columns.string == "ندوة":
                    subjects.append(columns.string)
                elif len(columns.string) <=8 and not columns.string.isnumeric() :
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
print(subjects[5])
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
# Convert data_list to JSON
json_data = json.dumps(data_list, ensure_ascii=False, indent=4)

# Write JSON data to a file
with open('sss.json', 'w', encoding='utf-8') as json_file:
    json_file.write(json_data)
    
with open('sss.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
levels = [5, 4, 4, 4, 4, 3, 4, 3, 2, 2, 2, 2]
index = 0

for count in levels:
    for _ in range(count):
        print(data[_])
    print("################")
    index += 1