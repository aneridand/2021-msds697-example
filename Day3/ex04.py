from pyspark import SparkConf, SparkContext
conf = SparkConf().setAppName("ex04")
sc = SparkContext(conf=conf)


sc.stop()
