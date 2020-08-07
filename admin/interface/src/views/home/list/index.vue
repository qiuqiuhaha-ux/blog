<template>
  <el-col :span="12">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      :default-openeds="['1']"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      :unique-opened="true"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/articleAdd">添加文章</el-menu-item>
          <el-menu-item index="/admin/articleDelet">管理文章</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>留言管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/ManagementDelete">管理留言</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/userPermission">用户权限</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>日记管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/diaryAdd">添加日记</el-menu-item>
          <el-menu-item index="/admin/diaryDelet">删除日记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>友联管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/unionAdd">添加友联</el-menu-item>
          <el-menu-item index="/admin/unionDelet">删除友联</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>