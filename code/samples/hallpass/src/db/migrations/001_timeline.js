export const up = function (knex) {
    return knex.schema.createTable("timeline", (table) => {
        table.specificType('id', 'int generated always as identity primary key');
        table.timestamp('opened_at').defaultTo(knex.fn.now()).notNull();
        table.timestamp('closed_at');
        table.integer('build');
        table.specificType('elapsed', 'int generated always as (extract(epoch from (closed_at - opened_at))) stored');
        table.string('username', 32);
        table.string('host', 32);
        table.string('type', 16);
        table.boolean('audio');
        table.boolean('incognito');
        table.string('url');
        table.string('title');
    }).then(() => {
        return knex.schema.raw('GRANT SELECT,INSERT,UPDATE,DELETE ON "timeline" to ??', process.env.DB_DIST_USER)
    })
};

export const down = function (knex) {
    return knex.schema.dropTableIfExists("timeline");
};