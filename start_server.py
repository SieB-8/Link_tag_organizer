import http.server
import socketserver
import webbrowser
import threading
import os
import logging

# Configuratie
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))  # De huidige map
logging.basicConfig(level=logging.INFO)

# Webserver klasse
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        logging.info("%s - - [%s] %s\n" % (self.client_address[0], self.log_date_time_string(), format % args))

# Server starten in een aparte thread
def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        httpd.serve_forever()

# Browser openen
def open_browser():
    url = f"http://localhost:{PORT}/frontend/index.html"
    webbrowser.open(url)

# Hoofdfunctie
if __name__ == "__main__":
    threading.Thread(target=start_server, daemon=True).start()  # Start server in aparte thread
    open_browser()

    # Wachten tot de gebruiker de server handmatig stopt (Ctrl+C)
    try:
        while True:
            pass
    except KeyboardInterrupt:
        print("\nServer gestopt.")