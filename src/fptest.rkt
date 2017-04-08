#lang racket

(require csv-reading)


(define music-list(csv->list (make-csv-reader (open-input-file "test.csv"))))

(display music-list)