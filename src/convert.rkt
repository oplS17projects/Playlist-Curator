#lang racket


(require csv-reading)


(define music-list(csv->list (make-csv-reader (open-input-file "test.csv"))))

;(display music-list)

(define (my-filter key)
  (filter (lambda(x)(if (equal? (car x) key) #t #f)) music-list))

(define (music-filter name) (if (null? (my-filter name)) (print "Not Found In Music Library") (display name)
                                ))
 
;(define check-for-song (music-filter "Hello"))
;;not found
(define check-for-song (music-filter "Wonderwall"))

