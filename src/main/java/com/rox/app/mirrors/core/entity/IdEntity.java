package com.rox.app.mirrors.core.entity;

import org.hibernate.annotations.GeneratorType;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * 统一定义id的entity基类.
 *
 * 基类统一定义id的属性名称数据类型列名映射及生成策略
 * Oracle每个Entity独立定义id的SEQUCENCE时，不继承于本类而改为实现一个Idable的接口
 */
@MappedSuperclass
public abstract class IdEntity {

	protected int id;

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
