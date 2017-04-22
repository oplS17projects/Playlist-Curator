#lang racket


(require csv-reading json xml)
;(require 2htdp/batch-io)

(define (hash-append . hashes)
    (make-immutable-hasheq
       (apply append
          (map hash->list hashes))))

(define music-list(csv->list (make-csv-reader (open-input-file "test.csv"))))

(define header (first music-list))

(define body (rest music-list))

(define obj1 (string->symbol (first header)))
(define obj2 (string->symbol (second header)))
(define obj3 (string->symbol (third header)))

(define jsexpr1 (make-hash (list (cons obj1 (first(first body))))))
(define jsexpr2 (make-hash (list (cons obj2 (second(first body))))))
(define jsexpr3 (make-hash (list (cons obj3 (third (first body))))))

(define track1 (hash-append jsexpr1 jsexpr2 jsexpr3))

(define jsexpr4 (make-hash (list (cons obj1 (first(second body))))))
(define jsexpr5 (make-hash (list (cons obj2 (second(second body))))))
(define jsexpr6 (make-hash (list (cons obj3 (third (second body))))))

(define track2 (hash-append jsexpr4 jsexpr5 jsexpr6))


(define jsexpr7 (make-hash (list (cons obj1 (first(third body))))))
(define jsexpr8 (make-hash (list (cons obj2 (second(third body))))))
(define jsexpr9 (make-hash (list (cons obj3 (third (third body))))))

(define track3 (hash-append jsexpr7 jsexpr8 jsexpr9))

(define song-list (list track1 track2 track3))

(call-with-output-file* "music.json" #:exists 'truncate
                        (lambda (o) (write-json song-list o)))


;;(rest music-list)
;;(string->jsexpr (first music-list))
;(write-file "music.json" (string->jsexpr music-list))
;(first music-list)

;;(jsexpr? jsexpr1)

;(write-file "music.json" (jsexpr->string music-list))

;(define xml-file (csv->sxml (open-input-file "test.csv") 'track '(name artist length)))
;;(write-xml xml-file "music.xml")