from django.contrib import admin
from django.urls import path, re_path

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_run/', views.create_run, name='create_run'),
    path('lessons.json', views.get_lessons, name='lessons'),
    re_path(r'^.*$', views.react_index, name="react_index")
]
