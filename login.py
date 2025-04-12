from flask import Flask, request, jsonify
from eth_account.messages import encode_defunct
from web3 import Web3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/api/verify", methods=["POST"])
def verify():
    data = request.get_json()
    address = data.get("address")
    message = data.get("message")
    signature = data.get("signature")

    if not address or not message or not signature:
        return jsonify(success=False, error="Missing required fields"), 400

    try:
        encoded_message = encode_defunct(text=message)
        recovered_address = Web3().eth.account.recover_message(encoded_message, signature=signature)

        if Web3.to_checksum_address(recovered_address) == Web3.to_checksum_address(address):
            return jsonify(success=True)
        else:
            return jsonify(success=False, error="Signature verification failed")

    except Exception as e:
        return jsonify(success=False, error=str(e)), 500

# if __name__ == "__main__":
    # app.run(debug=True, port=8080)
# Ensure Flask runs on host='0.0.0.0' and port 8080, as required by Cloud Run
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)  # This is necessary for Cloud Run