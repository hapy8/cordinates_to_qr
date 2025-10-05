import http.server
import socketserver
import socket

PORT = 0  # Use 0 to let the OS assign a random available port

# Change to the directory where the script is located
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

# Create the server with port 0 to get a random available port
httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)
PORT = httpd.server_address[1]  # Get the actual assigned port

with httpd:
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    print(f"Server started successfully!")
    print(f"Access locally at: http://localhost:{PORT}")
    print(f"Access from other devices on the same network at: http://{local_ip}:{PORT}")
    print("Press Ctrl+C to stop the server.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")