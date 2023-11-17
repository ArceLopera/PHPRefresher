The FTP functions give client access to file servers through the File Transfer Protocol (FTP).

The FTP functions are used to open, login and close connections, as well as upload, download, rename, delete, and get information on files from file servers. Not all of the FTP functions will work with every server or return the same results. The FTP functions became available with PHP 3.

If you only wish to read from or write to a file on an FTP server, consider using the ftp:// wrapper with the Filesystem functions which provide a simpler and more intuitive interface.

##  FTP Functions
|Function|	Description|
|--------|-----------|
|ftp_alloc()|	Allocates space for a file to be uploaded to the FTP server|
|ftp_cdup()	|Changes to the parent directory on the FTP server|
|ftp_chdir()|	Changes the current directory on the FTP server|
|ftp_chmod()	|Sets permissions on a file via FTP|
|ftp_close()	|Closes an FTP connection|
|ftp_connect()|	Opens an FTP connection|
|ftp_delete()|	Deletes a file on the FTP server|
|ftp_exec()|	Executes a command on the FTP server|
|ftp_fget()|	Downloads a file from the FTP server and saves it into an open local file|
|ftp_fput()|	Uploads from an open file and saves it to a file on the FTP server|
|ftp_get()|	Downloads a file from the FTP server|
|ftp_get_option()|	Returns runtime options of the FTP connection|
|ftp_login()|	Logs in to the FTP connection|
|ftp_mdtm()|	Returns the last modified time of a specified file|
|ftp_mkdir()|	Creates a new directory on the FTP server|
|ftp_mlsd()|	Returns the list of files in the specified directory|
|ftp_nb_continue()|	Continues retrieving/sending a file (non-blocking)|
|ftp_nb_fget()|	Downloads a file from the FTP server and saves it into an open file (non-blocking)|
|ftp_nb_fput()|	Uploads from an open file and saves it to a file on the FTP server (non-blocking)|
|ftp_nb_get()|	Downloads a file from the FTP server (non-blocking)|
|ftp_nb_put()|	Uploads a file to the FTP server (non-blocking)|
|ftp_nlist()|	Returns a list of files in the specified directory on the FTP server|
|ftp_pasv()|	Turns passive mode on or off|
|ftp_put()|	Uploads a file to the FTP server|
|ftp_pwd()|	Returns the current directory name|
|ftp_quit()|	Alias of ftp_close()|
|ftp_raw()|	Sends a raw command to the FTP server|
|ftp_rawlist()|	Returns a list of files with file information from a specified directory|
|ftp_rename()|	Renames a file or directory on the FTP server|
|ftp_rmdir()|	Deletes an empty directory on the FTP server|
|ftp_set_option()|	Sets runtime options for the FTP connection|
|ftp_site()|	Sends an FTP SITE command to the FTP server|
|ftp_size()|	Returns the size of the specified file|
|ftp_ssl_connect()|	Opens a secure SSL-FTP connection|
|ftp_systype()|	Returns the system type identifier of the FTP server|

## Predefined FTP Constants
|Constant|	Type|	Description|
|--------|--------|-----------|
|FTP_ASCII|	Integer|	 |
|FTP_AUTOSEEK|	Integer|	 |
|FTP_AUTORESUME|	Integer	| |
|FTP_BINARY|	Integer	 ||
|FTP_FAILED|	Integer	|Asynchronous transfer has failed|
|FTP_FINISHED|	Integer|	Asynchronous transfer is completed|
|FTP_IMAGE|	Integer	|Alias of FTP_BINARY|
|FTP_MOREDATA|	Integer|	Asynchronous transfer is in progress|
|FTP_TEXT|	Integer|	Alias of FTP_ASCII|
|FTP_TIMEOUT_SEC|	Integer|	The timeout used for network operations|
|FTP_USEPASVADDRESS|	Boolean	 ||