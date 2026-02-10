# How to Preview the Website

## Method 1: Using PHP Built-in Server (Recommended)

1. **Install PHP** (if not already installed):
   - Download from: https://www.php.net/downloads.php
   - Or use XAMPP: https://www.apachefriends.org/

2. **Open Terminal/Command Prompt** in your project folder:
   ```bash
   cd "E:\app dev\collegewebcu\new\collegereferralwebsite"
   ```

3. **Start PHP Server**:
   ```bash
   php -S localhost:8000
   ```

4. **Open Browser** and visit:
   ```
   http://localhost:8000/index.php
   ```

## Method 2: Using XAMPP (Windows)

1. **Download and Install XAMPP** from https://www.apachefriends.org/

2. **Copy your project folder** to:
   ```
   C:\xampp\htdocs\collegereferralwebsite
   ```

3. **Start Apache** from XAMPP Control Panel

4. **Open Browser** and visit:
   ```
   http://localhost/collegereferralwebsite/index.php
   ```

## Method 3: Quick HTML Preview (Limited - No PHP Includes)

If you just want to see the HTML structure:

1. **Open Terminal** in your project folder

2. **Start Python HTTP Server**:
   ```bash
   python -m http.server 8000
   ```

3. **Open Browser** and visit:
   ```
   http://localhost:8000/index.php
   ```

   ⚠️ **Note**: PHP includes won't work - you'll see raw PHP code. Use this only for quick HTML/CSS/JS preview.

## Method 4: Using VS Code Live Server Extension

1. **Install "Live Server" extension** in VS Code

2. **Right-click on `index.php`** → Select "Open with Live Server"

   ⚠️ **Note**: PHP includes won't work with Live Server either.

---

## Recommended Approach

For full functionality with PHP includes working:
- **Use Method 1 or Method 2** (PHP server or XAMPP)

For quick HTML/CSS/JS preview:
- **Use Method 3 or Method 4** (but remember PHP includes won't render)





