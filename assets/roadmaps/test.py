import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time
import json
# Set the encoding to utf-8 for printing
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8')

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

# Open the website
driver.get("https://bstureg.imamu.edu.sa/StudentRegistrationSsb/ssb/registration/registration")

# Wait for the element to be present (the "classSearch" button)
wait = WebDriverWait(driver, 10)  # You can adjust the timeout as needed
button = wait.until(EC.presence_of_element_located((By.ID, "registerLink")))

# Click the "classSearch" button
button.click()

# After clicking the button, you will likely be on a login page
# Locate the username and password fields and enter your credentials
username_field = driver.find_element(By.ID, "usernameUserInput")
password_field = driver.find_element(By.ID, "password")

# Enter your username and password
username_field.send_keys("443017764")
password_field.send_keys("gnc@14357g")

# Locate and click the login button
login_button = driver.find_element(By.CLASS_NAME, "login-btn")
login_button.click()
time.sleep(2)

# Rest of your code for parsing and extracting data
back_btn = driver.find_element(By.CLASS_NAME, "breadcrumbButton")
back_btn.click()
time.sleep(2)

search_btn = driver.find_element(By.ID, "classSearchLink")
search_btn.click()
time.sleep(2)

field = driver.find_element(By.ID, "s2id_txt_term")
field.click()
time.sleep(2)

sec = driver.find_element(By.CLASS_NAME, "select2-result-label")
sec.click()
time.sleep(2)

term_go = driver.find_element(By.ID, "term-go")
term_go.click()
time.sleep(2)
# Click the "البحث المتقدم" link using JavaScript
advanced_search_link = driver.find_element(By.ID, "advanced-search-link")
driver.execute_script("arguments[0].click();", advanced_search_link)

# Clicking the link may open a new tab, so switch to the new tab
driver.switch_to.window(driver.window_handles[-1])
time.sleep(1)
choose = driver.find_element(By.ID, "s2id_txt_campus")
choose.click()
time.sleep(1)
male = driver.find_element(By.ID, "select2-result-label-16")
male.click()
choose.click()
time.sleep(1)
female = driver.find_element(By.ID, "select2-result-label-28")
female.click()
time.sleep(1)
colage = driver.find_element(By.XPATH, "//div[@id='s2id_txt_college']/ul[@class='select2-choices']/li[@class='select2-search-field']")
colage.click()
time.sleep(2)
# Define the list of colleges you want to select
collageWant = ["أصول الدين", "الإعلام والاتصال", "الاقتصاد والعلوم الإدارية", "الشريعة", "الشريعة والدراسات الإسلامية", "العلوم", "اللغات والترجمة", "اللغة العربية", "علوم الحاسب والمعلومات"]
collageList = driver.find_elements(By.XPATH, "//div[@id='select2-drop']/ul/li/div/div")
time.sleep(1)
collageId = []
for i in collageWant:
    for j in collageList:
        if j.text == i:
            collageId.append(j.get_attribute("id"))
for i in collageId:
    driver.find_element(By.ID, i).click()
    colage.click()
    time.sleep(1)

search_go = driver.find_element(By.ID, "search-go")
driver.execute_script("arguments[0].click();", search_go)
time.sleep(3)
selected = driver.find_element(By.CLASS_NAME, "page-size-select")
ss = Select(selected)
ss.select_by_index(3)
time.sleep(2)
pageTotal = driver.find_element(By.CLASS_NAME, "total-pages")
total = pageTotal.text
total = int(total)
print(total)
time.sleep(2)

# Use a try-except block to handle UnicodeEncodeError when printing
data = []
i = 1
while i <= total:
    try:
        # Locate the table and its rows
        table = driver.find_element(By.TAG_NAME, "tbody")
        rows = table.find_elements(By.TAG_NAME, "tr")
        # Create a dictionary for each course
        time.sleep(4)
        for row in rows:
            course_data = {}
            course_data["title"] = row.find_element(By.XPATH, ".//td[@xe-field='courseTitle']").text
            course_data["code"] = row.find_element(By.XPATH, ".//td[@xe-field='courseNumber']").text
            course_data["source_code"] = row.find_element(By.XPATH, ".//td[@xe-field='courseReferenceNumber']").text
            course_data["teacher"] = row.find_element(By.XPATH, ".//td[@xe-field='instructor']").text
            course_data["date"] = row.find_element(By.XPATH, ".//td[@xe-field='meetingTime']").text
            course_data["free"] = row.find_element(By.XPATH, ".//td[@xe-field='status']").text
            data.append(course_data)
            print(f"Done: {i}\n")
        i += 1
        if i == total:
            break
        nextPage = driver.find_element(By.CLASS_NAME, "paging-control.next.rtl.enabled")
        driver.execute_script("arguments[0].click();", nextPage)
        time.sleep(4)
    except UnicodeEncodeError as e:
        print("UnicodeEncodeError:", e)

# Specify the file path where you want to save the JSON data
json_file_path = "course_data.json"

# Write the JSON data to the file
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=2)


time.sleep(15)

# Close the browser when done
driver.quit()
