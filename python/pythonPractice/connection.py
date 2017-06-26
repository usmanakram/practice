connection.py# #!/usr/bin/python

# import MySQLdb

# # Open database connection
# db = MySQLdb.connect("localhost","root","","practice" )

# # prepare a cursor object using cursor() method
# cursor = db.cursor()

# # execute SQL query using execute() method.
# cursor.execute("SELECT VERSION()")

# # Fetch a single row using fetchone() method.
# data = cursor.fetchone()

# print "Database version : %s " % data

# # disconnect from server
# db.close()




#!/usr/bin/python

import MySQLdb

# Open database connection
db = MySQLdb.connect("localhost","root","","practice" )

# prepare a cursor object using cursor() method
# cursor = db.cursor()
cursor = db.cursor(MySQLdb.cursors.DictCursor)

# Prepare SQL query to INSERT a record into the database.
sql = "SELECT * FROM employees \
       WHERE income > '%d'" % (1000)
try:
   # Execute the SQL command
   cursor.execute(sql)
   # Fetch all the rows in a list of lists.
   results = cursor.fetchall()
   # for row in results:
   #    id = row[0]
   #    first_name = row[1]
   #    last_name = row[2]
   #    hire_date = row[3]
   #    income = row[4]
   #    # Now print fetched result
   #    print "id=%d, first_name=%s, last_name=%s, hire_date=%s, income=%d" % \
   #           (id, first_name, last_name, hire_date, income )

   print results[0]['first_name']
except:
   print "Error: unable to fecth data"

# disconnect from server
db.close()









# import datetime
# import mysql.connector

# cnx = mysql.connector.connect(user='root', database='practice')
# cursor = cnx.cursor()

# query = ("SELECT first_name, last_name, hire_date FROM employees "
#          "WHERE hire_date BETWEEN %s AND %s")

# hire_start = datetime.date(1999, 1, 1)
# hire_end = datetime.date(2016, 12, 31)

# cursor.execute(query, (hire_start, hire_end))

# for (first_name, last_name, hire_date) in cursor:
#   print("{}, {} was hired on {:%d %b %Y}".format(
#     last_name, first_name, hire_date))

# cursor.close()
# cnx.close()