#! python3
from os import listdir, remove
from os.path import splitext
from PIL import Image
import piexif, os, sys, shutil

ACCEPTED = ['.jpg', '.jpeg', '.JPG', '.JPEG']
FINAL_SIZE = 244,244
RESIZED_DIR = 'resized'

REMOVED = 0
OKAY = 0
ONLY_CHECKED = 0

rootDir = "samples"
newRoot = rootDir + "-res"
fileSet = set()

def start():
	dirCheck(newRoot)
	for dir_, _, files in os.walk(rootDir):
		for fileName in files:
			relDir = os.path.relpath(dir_, rootDir)
			relFile = os.path.join(relDir, fileName)
			fileAbsPath = os.path.join(os.path.abspath(dir_), fileName)
			dirCheck(os.path.join(newRoot, relDir))
			# print(relDir)
			resize(relFile, fileAbsPath, os.path.abspath(newRoot))
			# fileSet.add(relFile)


def dirCheck(folder):
	try:
		# Create target Directory
		os.mkdir(folder)
		print("Directory" , folder ,  "Created ") 
	except FileExistsError:
		pass

def resize(filename, fileAbsPath, newDir):
	global OKAY, ONLY_CHECKED
	newLocation = os.path.join(newDir, filename)
	if (os.path.isfile(fileAbsPath) and not os.path.isfile(newLocation)):
		try: 
			checkIntegrity(fileAbsPath)
			im = Image.open(fileAbsPath)
			im.thumbnail(FINAL_SIZE, Image.ANTIALIAS)
			im.save(newLocation, "JPEG")
			print("RESIZE: OK: ", newLocation[:50])
			OKAY += 1

		except IOError:
			print("Could not resize image:", filename[:50])

		except Exception as e:
			print("File removed!")
	else:
		print("Resized exists!", (newLocation))
		ONLY_CHECKED += 1

def grayChecker(item):
	'''Checks the percentage of gray pixels. If the image has more than the allowed, it will be removed.'''
	global REMOVED, OKAY, ONLY_CHECKED
	percentage = 95
	pixel_color = [(108, 108, 108), (148, 148, 148)]

	try:
		im = Image.open(item)
		pixels = list(im.getdata())
		width, height = im.size
		pixels1 = [pixels[i * width:(i + 1) * width] for i in range(height)]
		gray=0
		other=0
		for data in pixels1:
			for pix in data:
				if pix > pixel_color[0] and pix < pixel_color[1]:
					gray += 1
				else:
					other += 1

		corruption_area = gray * 100 / (gray + other)

		if corruption_area >= percentage:   
			print ('GRAY CHECK: FAILED >', end=" ")
			raise Exception(1000)
		else:
			print ('GRAY CHECK: OK >', end=" ")

		im.close()

	except Exception as e:
		raise e
	

def checkIntegrity(filename):
	global REMOVED
	print("IMAGE CHECK >", end=" ")
	try:
		data = piexif.load(filename) # Dict with metadata
		piexif.remove(filename)
		empty = piexif.load(filename) # No metadata

		grayChecker(filename) 
		
		img = Image.open(filename) # open the image file
		img.verify() # verify that it is, in fact an image
		print("OK:", "RESIZING >", end=" ")
		img.close() # verify that it is, in fact an image

	except:
		print('REMOVED: Bad file:', filename, end=" ") # print out the names of corrupt files
		REMOVED += 1
		remove(filename)
		raise Exception(1000)





if __name__ == "__main__":
	start()
	print("\n=====================")
	print("\tSUMMARY:\n")
	print("\t\tTotal Removed Files:", REMOVED)
	print("\t\tSuccessful Resize:", OKAY)
	print("\t\tAlready Resized in New Folder:", ONLY_CHECKED)
	print("\t\tTotal:", OKAY+REMOVED+ONLY_CHECKED)
