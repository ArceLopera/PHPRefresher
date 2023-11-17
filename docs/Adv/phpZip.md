## Installation
### Linux Systems

For these functions to work, you have to compile PHP with --enable-zip.

+ PHP 5.6: Use the --with-libzip=DIR configure option to use a system libzip installation. libzip version 0.11 is required, with 0.11.2 or later recommended.

+ PHP 7.3: Building against the bundled libzip is discouraged, but still possible by adding --without-libzip to the configuration.

### Windows Systems

+ Before PHP 5.3: Users must enable "php_zip.dll" inside of "php.ini" for these functions to work.

+ From PHP 5.3: The ZIP extension is built-in.

## PHP Zip Functions

|Function|	Description|
|--------|------------|
| zip_close()|	Closes a ZIP file archive|
| zip_entry_close()|	Closes a ZIP directory entry|
| zip_entry_compressedsize()|	Returns the compressed file size of a ZIP directory entry|
| zip_entry_compressionmethod()|	Returns the compression method of a ZIP directory entry|
| zip_entry_filesize()|	Returns the actual file size of a ZIP directory entry|
| zip_entry_name()|	Returns the name of a ZIP directory entry|
| zip_entry_open()|	Opens a directory entry in a ZIP file for reading|
| zip_entry_read()|	Reads from an open directory entry in the ZIP file|
| zip_open()|	Opens a ZIP file archive|
| zip_read()|	Reads the next file in a open ZIP file archive|