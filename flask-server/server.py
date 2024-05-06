from flask import Flask, request

app = Flask(__name__)

#Members API router
@app.route("/matching", methods=['POST'])
def members():
    # Get the posted data
    data = request.get_json()

    # The object looking to be matched with a set of objects
    matchObject = data["matchObject"]
    # The list of potential matches
    matchList = data["matchList"]

    # Stores the total number of prompts matched
    totalMatched = 0
    # Stores the total numebr of prompts (matchObject side only)
    totalPrompts = 0

    # Setup data type
    topThree = [{ "id": "", "matchScore": 0 }, { "id": "", "matchScore": 0}, { "id": "", "matchScore": 0 }]

    # Loop through all the potential matches
    for potentialMatch in matchList:
        # Loop through each key, only need to check the ones that are lists of prompts
        for moKey in matchObject:
            # If the type is a list of prompts
            if (type(matchObject[moKey]) == list):
                for prompt in matchObject[moKey]:
                    # Add one to the total prompts
                    totalPrompts += 1
                    
                    # If the prompt is in the potentilMatch prompt list, add one to total matched
                    if (prompt in potentialMatch[moKey]):
                        totalMatched += 1

        matchScore = round((totalMatched / totalPrompts), 2)

        # Update top three matches accordingly 
        if (matchScore > topThree[0]["matchScore"]):
            # Move the second score to third
            topThree[2]["matchScore"] = topThree[1]["matchScore"]
            topThree[2]["id"] = topThree[1]["id"]

            # Move the fist score to second
            topThree[1]["matchScore"] = topThree[0]["matchScore"]
            topThree[1]["id"] = topThree[0]["id"]

            # Update the first score
            topThree[0]["matchScore"] = matchScore
            topThree[0]["id"] = potentialMatch["mentorId"]
        elif (matchScore > topThree[1]["matchScore"]):
            # Move the second score to third
            topThree[2]["matchScore"] = topThree[1]["matchScore"]
            topThree[2]["id"] = topThree[1]["id"]

            # Update the second score
            topThree[1]["matchScore"] = matchScore
            topThree[1]["id"] = potentialMatch["mentorId"]
        elif (matchScore > topThree[2]["matchScore"]):
            # Update the third score
            topThree[2]["matchScore"] = matchScore
            topThree[2]["id"] = potentialMatch["mentorId"]

        totalMatched = 0
        totalPrompts = 0

    return topThree

if __name__ == "__main__":
    app.run(debug=True)
