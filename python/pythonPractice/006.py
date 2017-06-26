# import numpy as np
# import matplotlib.pyplot as plt

# x = [2,3,4,5,7,9,13,15,17]
# plt.plot(x)
# plt.ylabel('Sunlight')
# plt.xlabel('Time')
# plt.show()


#!/usr/bin/python

# import sys

# print('Arguments:', len(sys.argv))
# print('List:', str(sys.argv))








#!/usr/bin/python
###########################################################
#
# This python script is used To push files to S3
# 
#
# Written by : Azeem Arshad
#
##########################################################
​
import tinys3
import os
import time
import datetime
import sys
​
​
​
S3_ACCESS_KEY = 'AKIAIPYVX2OORIQOVCCQ' 
S3_SECRET_KEY = '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'
S3_BUCKET_NAME = 'ztidotcombackup'
​
cmdArgs = sys.argv
filePath = ''
keyName = 'xnspy/production/log/db/'
​
if(len(cmdArgs)> 2):
	filePath = cmdArgs[1]
	keyName = cmdArgs[2]
else:
	print "Dirty input exiting"
	sys.exit()
print "=========================== keyName = "+keyName+" filePath = "+filePath
​
conn = tinys3.Connection(S3_ACCESS_KEY, S3_SECRET_KEY, tls=True, endpoint='s3-us-west-2.amazonaws.com')
​
def getSize(fileobject):
    fileobject.seek(0,2) # move the cursor to the end of the file
    size = fileobject.tell()
    return size
​
​
f = open(filePath,'rb')
#print "Name of the file: ", f.name
#print getSize(f)
conn.upload(keyName,f,S3_BUCKET_NAME,headers={
            'x-amz-storage-class': 'REDUCED_REDUNDANCY','x-amz-acl':'private'
            })