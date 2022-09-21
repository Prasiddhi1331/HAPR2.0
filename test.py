import sys, json
  
# Function to calculate the sum of array
def arraysum(arr):
    return sum(arr)
  
# Get the command line arguments
# and parse it to json
data = json.loads(sys.argv[1])
  
# Get the required field from
# the data
array = data['array']
  
# Calculate the result
result = arraysum(array)
  
# Print the data in stringified
# json format so that we can
# easily parse it in Node.js
newdata = {'sum':result}
print(json.dumps(newdata))