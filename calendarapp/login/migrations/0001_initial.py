# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-04 04:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('alteremail', models.CharField(blank=True, default='', max_length=50)),
                ('motto', models.CharField(blank=True, default='', max_length=60)),
                ('bio', models.CharField(blank=True, default='', max_length=255)),
                ('url', models.CharField(blank=True, default='', max_length=50)),
                ('company', models.CharField(blank=True, default='', max_length=50)),
            ],
        ),
    ]
