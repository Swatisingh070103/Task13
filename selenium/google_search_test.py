from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Set up the Chrome driver (make sure chromedriver is in your PATH)
driver = webdriver.Chrome()

# Open Google
driver.get("https://www.google.com")

# Find the search box
search_box = driver.find_element(By.NAME, "q")

# Type "OpenAI" and press Enter
search_box.send_keys("OpenAI")
search_box.send_keys(Keys.RETURN)

# Wait for results to load
time.sleep(2)

# Print the title of the current page
print(driver.title)

# Close the browser
driver.quit()
