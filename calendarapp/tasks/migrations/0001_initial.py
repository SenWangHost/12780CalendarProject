# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-07 02:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('allDay', models.BooleanField(default=False)),
                ('startDate', models.CharField(max_length=50)),
                ('color', models.CharField(max_length=30)),
                ('startTime', models.CharField(blank=True, default='', max_length=50)),
                ('endDate', models.CharField(blank=True, default='', max_length=50)),
                ('endTime', models.CharField(blank=True, default='', max_length=50)),
                ('description', models.CharField(blank=True, default='', max_length=255)),
                ('location', models.CharField(blank=True, default='', max_length=255)),
            ],
        ),
    ]
