import http.server, socketserver, webbrowser, os, threading
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = 8000
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), H) as httpd:
    url = f"http://localhost:{PORT}/index.html"
    print(f"\nYour site is running at {url}\nPress Ctrl+C to stop.\n")
    threading.Timer(1, lambda: webbrowser.open(url)).start()
    httpd.serve_forever()
