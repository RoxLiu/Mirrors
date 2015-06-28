/*/////////////////////////////////////////////////////////////////////////
 * Copyright (C) 2015 太昌电子
 *
 *
 * 改版历史：
 * 2015年5月25日：lixu create this file and upload to SVN.
 *//////////////////////////////////////////////////////////////////////////
package com.rox.app.mirrors.core.repository;


import com.rox.app.mirrors.core.entity.PostItem;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


/**
 *
 */
public interface PostItemDao extends PagingAndSortingRepository<PostItem, Integer>, JpaSpecificationExecutor<PostItem> {

}
