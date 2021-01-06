"""
Created on October, 2020

@author: Diane Woodbridge
"""
import os
import sys

import numpy


def function_with_many_many_argunemts(variable_1, variable_2,
                                      variable_3, variable_4):
    """
    Function takes multiple variables as arguments
    """
    print("wow")


def insert(data):
    """
    update data using update() with parameters
    """
    preprocessed_data = update(data, [1, 2])


def update(data=None):
    """
    return array dot product of data and parameter
    """
    array_1 = numpy.array(data)
    array_2 = numpy.array(parameter)
    return array_1.dot(array_2)


def drop(db, table):
    """
    Designed specifically for MonogoDB.
    Todo: extend it for other DBs.
    """
    find(db).drop(table)
    # An error will occur, if db or table doesn't exist.


def delete_table(data):  # Fix this: Readability?
    """
    Return False
    """
    parameter = [100, 0]
    processed_data = preprocess(data, parameter)
    return False
