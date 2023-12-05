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
    
    ignore = ["NaN", "الوحدات", "اسم المقرر", "رمز المقرر", "الساعات", "م"]
    hour = []
    code = []
    subjects = []
    data_list = []
    subWant = ["النحو","التوحيد","ندوة","تعلم الة","العقيدة","الفقه", "انجلزي 1","انجلزي 2"]
    # Find all <tr> elements
    for row in soup.find_all('tr'):
        # Extract data from each <td> element within the <tr>
        for columns in row.find_all('td'):
            # Check if the row contains valid data and has at least 6 columns
            if columns.string not in ignore:
                newString = columns.string.split("،")
                data_dict = {
                    "req": newString
                }
                data_list.append(data_dict)
            

        
json_data = json.dumps(data_list, ensure_ascii=False, indent=4)
print(json_data)