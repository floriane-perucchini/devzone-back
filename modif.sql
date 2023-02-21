BEGIN;

ALTER TABLE favorite
    RENAME TO bookmark;
COMMIT;