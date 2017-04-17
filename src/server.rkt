#lang racket

;;http://www.ccs.neu.edu/home/types/racket-doc/web-server/run.html
;;https://developer.spotify.com/web-api/tutorial/#disqus_thread
;;https://developer.spotify.com/web-api/authorization-guide/#authorization-code-flow

;;issue on clicking button to login GET to localhost/login is not found..
;;"Connection was rest"

(require web-server/servlet
         web-server/servlet-env
         web-server/http/bindings);;need those bindings yall, aslo will need the json req


(define root (current-directory))

(define index-page (file->string "index.html"))

(define (my-app req)
  (response
   200                 ; response code
   #"OK"               ; response message
   (current-seconds)   ; timestamp
   TEXT/HTML-MIME-TYPE ; MIME type for content
   '()                 ; additional headers

   (lambda (client-out)
     (write-string index-page client-out))))
 
;;(serve/servlet my-app #:port 8888
              ;; #:server-root-path "/")

;open html file to input user name and such....
; GET /login -> https://accounts.spotify.com/authorize


