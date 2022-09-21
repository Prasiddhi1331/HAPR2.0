import sys, json
  
def arraysum(arr):
    return sum(arr)
  
data = json.loads(sys.argv[1])  
array = data['array']  
result = arraysum(array)  
newdata = {'sum':result}
print(json.dumps(newdata))