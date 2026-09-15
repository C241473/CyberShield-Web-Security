import sys
import ssl
import socket
import json
from datetime import datetime, timezone
from urllib.parse import urlparse

def scan_ssl(target):
    if target.startswith("http://") or target.startswith("https://"):
        parsed = urlparse(target)
        hostname = parsed.hostname or parsed.path
        port = parsed.port or (443 if parsed.scheme == "https" else 443)
    else:
        if ":" in target:
            parts = target.split(":")
            hostname = parts[0]
            port = int(parts[1])
        else:
            hostname = target
            port = 443

    result = {
        "hostname": hostname,
        "port": port,
        "has_ssl": False,
        "valid": False,
        "issuer": None,
        "subject": None,
        "valid_from": None,
        "valid_to": None,
        "days_remaining": 0,
        "cipher": None,
        "protocol": None,
        "sans": [],
        "error": None
    }

    try:
        context = ssl.create_default_context()
        context.check_hostname = True
        
        with socket.create_connection((hostname, port), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                cipher = ssock.cipher()
                version = ssock.version()
                
                result["has_ssl"] = True
                result["valid"] = True
                result["cipher"] = cipher[0] if cipher else None
                result["protocol"] = version

                # Extract Issuer
                issuer_dict = dict(x[0] for x in cert.get('issuer', []))
                result["issuer"] = issuer_dict.get('organizationName') or issuer_dict.get('commonName') or str(cert.get('issuer'))

                # Extract Subject
                subject_dict = dict(x[0] for x in cert.get('subject', []))
                result["subject"] = subject_dict.get('commonName') or str(cert.get('subject'))

                # Extract Dates
                not_before = cert.get('notBefore')
                not_after = cert.get('notAfter')
                
                if not_before:
                    dt_before = datetime.strptime(not_before, '%b %d %H:%M:%S %Y %Z').replace(tzinfo=timezone.utc)
                    result["valid_from"] = dt_before.isoformat()

                if not_after:
                    dt_after = datetime.strptime(not_after, '%b %d %H:%M:%S %Y %Z').replace(tzinfo=timezone.utc)
                    result["valid_to"] = dt_after.isoformat()
                    
                    now = datetime.now(timezone.utc)
                    delta = (dt_after - now).days
                    result["days_remaining"] = max(0, delta)

                # Subject Alt Names
                sans = [item[1] for item in cert.get('subjectAltName', []) if item[0] == 'DNS']
                result["sans"] = sans[:10]  # top 10

    except ssl.SSLError as e:
        result["has_ssl"] = True
        result["valid"] = False
        result["error"] = f"SSL Error: {str(e)}"
    except Exception as e:
        result["has_ssl"] = False
        result["error"] = str(e)

    return result

if __name__ == "__main__":
    target_host = sys.argv[1] if len(sys.argv) > 1 else "example.com"
    ssl_data = scan_ssl(target_host)
    print(json.dumps(ssl_data))
