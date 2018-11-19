import os
import sqlite3
from sqlite3 import Error
import create_tables as ct


class DataBase(object):
    def __init__(self, db_file):
        self.db_file = db_file

        if os.path.isfile(db_file):
            self.conn = self.create_connection(db_file)
        else:
            self.conn = self.create_connection(db_file)
            for table_name in ct.create_tables:
                self.create_table(table_name, ct.create_tables[table_name])

    def create_connection(self, db_file):
        """ create a database connection to the SQLite database
            specified by db_file
        :param db_file: database file
        :return: Connection object or None
        """
        try:
            self.conn = sqlite3.connect(db_file)
            return self.conn
        except Error as e:
            print(e)

        return None

    def create_table(self, table_name, create_table_sql):
        """ create a table from the create_table_sql statement
        :param conn: Connection object
        :param create_table_sql: a CREATE TABLE statement
        :return:
        """
        print('Creating: ', table_name)
        try:
            c = self.conn.cursor()
            c.execute(create_table_sql)
            self.conn.commit()
        except Error as e:
            print(e)
            print(table_name)
            print(create_table_sql)

    def query_database(self, sql_query, payload=''):
        try:
            c = self.conn.cursor()
            c.execute(sql_query, payload)
            return c.fetchall()
        except Error as e:
            print(e)
            print(sql_query)

    def modify_database(self, sql_query, payload):
        cur = self.conn.cursor()
        cur.execute(sql_query, payload)
