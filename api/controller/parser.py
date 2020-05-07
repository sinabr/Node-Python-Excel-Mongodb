import xlrd
import gc
import json
import sys
import os 
workbook = xlrd.open_workbook(sys.argv[1])
worksheet = workbook.sheet_by_index(0)

items = []

for row in range (1,worksheet.nrows):
    item = {}
    for col in range(0 , worksheet.ncols):
        # item key value as in excel file
        item.update({worksheet.cell_value(0,col):worksheet.cell_value(row,col)})
    items.append(item)

jsonfile = sys.argv[1].replace('.xlsx','.json')
with open(jsonfile, 'w') as fout:
    json.dump(items , fout)

del items[:] 
del jsonfile 
del worksheet 
del workbook 
print('done')
gc.collect()
# we might want to remove the xlsx file after the conversion    
#os.remove(sys.argv[1])